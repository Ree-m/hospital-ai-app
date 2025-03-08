import Groq from "groq-sdk";
import { z } from "zod";

export async function POST(req: Request) {
  const { image } = await req.json();
  if (!image) {
    return Response.json({ error: "No image provided" }, { status: 400 });
  }

  const responseSchema = z.object({
    infected: z.boolean().optional(),
    care_instructions: z.string().optional(),
    is_wound: z.boolean(),
  });

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `This is an image of a wound. Analyze it carefully and classify it as **potentially infected** or **not infected** based on visible signs. 
            Consider the following criteria:

            - **Potentially infected wounds** may show swelling, pus, foul odor, excessive warmth, or spreading streaks.
            - **Not infected wounds** should appear clean, with scabbing or mild redness but no pus, or excessive swelling.
            - **Strictly follow these criteria. If uncertain, default to 'not infected' unless clear infection signs are present.**  

            If the wound is infected, return **true**. If not, return **false**. Additionally, provide appropriate care instructions for the specific wound. Each instruction should be a concise statement with no extra explanations. Ensure 3-5 points of care, and use a format like this:

            Additionally, provide appropriate care instructions formatted as a single string where each instruction appears on a new line, like this:

            "1. First care instruction.\n2. Second care instruction.\n3. Third care instruction.,etc..."

            If the image is not a wound, return **is_wound**: false and do not provide infection status or care instructions.


            **Respond only in valid JSON format** with the following structure:

            {
             "is_wound": "boolean"
            "infected": "boolean", (only if is_wound is true)
             "care_instructions": "string" (only if is_wound is true)
            }
              Ensure each care instruction is on a new line.`,
          },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
    model: "llama-3.2-11b-vision-preview",
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 0.1,
    stream: false,
    stop: null,
    response_format: { type: "json_object" },
  });

  const content = chatCompletion.choices[0].message.content;
  if (!content) {
    return Response.json({ error: "No content provided" }, { status: 500 });
  }

  try {
    const parsedData = responseSchema.safeParse(JSON.parse(content));
    return Response.json(parsedData.data);
  } catch (error) {
    return Response.json(
      { error: `Error parsing response: ${error}` },
      { status: 500 }
    );
  }
}
