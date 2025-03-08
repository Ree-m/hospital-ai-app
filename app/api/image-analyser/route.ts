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
            text: `This is the image of a wound. Classify it as potentially infected or not. 
            Based on the image, is it infected or not? If yes, return "infected": true. If no, return "infected": false.
            Provide a confidence score between 0% and 100% for the classification. If you are sure it is infected, you can provide a high confidence score. If you are unsure, provide a lower confidence score.
            Also, provide appropriate care instructions. 
            **Respond only in valid JSON format** with the following structure:

            {
              "infected": "boolean",
              "confidence": "number",
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
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
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
