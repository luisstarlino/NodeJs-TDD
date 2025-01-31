import OpenAI from "openai";

export class ExtractNotesService {
    private _openAI: OpenAI;
    private _text: String;

    constructor(text: string) {
        this._openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        this._text = text;
    }

    async execute() {

        const response = await this._openAI.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Você é um assistente que transforma textos livres em anotações organizadas." },
                { role: "user", content: `Agora, transforme o seguinte texto em um JSON conforme o formato esperado:\n"${this._text}"` }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        })

        return JSON.parse(response.choices[0]?.message?.content || "{}");

    }
}