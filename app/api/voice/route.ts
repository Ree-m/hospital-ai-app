import Groq from "groq-sdk";

// export async function GET() {
//   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
//   const translation = await groq.audio.translations.create({
//     file: fs.createReadStream("public/harvard.mp4"),
//     model: "whisper-large-v3",
//     prompt: "Specify context or spelling",
//     response_format: "json",
//     temperature: 0.0,
//   });
//   console.log(translation.text);
//   return Response.json({ message: translation.text });
// }
// export async function GET() {
//   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
//   const translation = await groq.audio.translations.create({
//     file: fs.createReadStream("public/harvard.mp4"),
//     model: "whisper-large-v3",
//     prompt: "Specify context or spelling",
//     response_format: "json",
//     temperature: 0.0,
//   });
//   console.log(translation.text);
//   return Response.json({ message: translation.text });
// }
import z from "zod";

const responseSchema = z.object({
  "Chief Complaint": z.string(),
  "History of Present Illness": z.string(),
  "Examination Findings": z.string(),
  "Assessment and Plan": z.string(),
  "Medications and Allergies": z.string(),
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `
        Organize the following medical note into structured sections: 
        - Chief Complaint
        - History of Present Illness
        - Examination Findings
        - Assessment and Plan
        - Medications and Allergies

        Here is the text:
        "${text}"

        If a section is not present, return No {section name} {were/was} Provided.

        Return the output in JSON format like this:
        {
            "Chief Complaint": "...",
            "History of Present Illness": "...",
            "Examination Findings": "...",
            "Assessment and Plan": "..."
            "Medications and Allergies": "...",
      }
    `;
  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that  reads patient data text generates structured JSON dividing sais text into predefined sections for a clicnical note",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  try {
    console.log(
      `response.choices[0].message.content: ${response.choices[0].message.content}`
    );
    const parsedContent = JSON.parse(
      response.choices[0].message.content || "{}"
    );

    const parsedData = responseSchema.parse(parsedContent);
    return Response.json(parsedData);
  } catch (error) {
    return Response.json(
      { error: `Error parsing response: ${error}` },
      { status: 500 }
    );
  }
}
