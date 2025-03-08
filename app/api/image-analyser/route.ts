import Groq from "groq-sdk";

export async function POST(req: Request) {
  const { image } = await req.json();
  if (!image) {
    return Response.json({ error: "No image provided" }, { status: 400 });
  }

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

            If the wound is infected, return **true**. If not, return **false**. Additionally, provide appropriate care instructions.

            **Respond only in valid JSON format** with the following structure:

            {
              "infected": "boolean",
              "care_instructions": "string"
            }`,
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

  console.log(chatCompletion.choices[0].message.content);

  try {
    return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
  } catch (error) {
    return Response.json(
      { error: `Error parsing response: ${error}` },
      { status: 500 }
    );
  }
}
