import Groq from "groq-sdk";
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
  const content = response.choices[0].message.content;
  if (!content) {
    return Response.json(
      { error: "Empty response from Groq API" },
      { status: 500 }
    );
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
