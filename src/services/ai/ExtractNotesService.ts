import OpenAI from "openai";
import { Post } from "../../entities/Post";
import { getCustomRepository } from "typeorm";
import { IExtractNote } from "../../interfaces";
import { PostRepository } from "../../repositories/PostRepository";

export class ExtractNotesService {
    private _openAI: OpenAI;
    private _author: string;
    private _text: string;
    private _savePostRepository: PostRepository;

    constructor({ content, author }: IExtractNote) {
        this._openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        this._author = author;
        this._text = content;
        this._savePostRepository = getCustomRepository(PostRepository);
    }

    async execute() {

        // ===== AI INTEGRATION
        const response = await this._openAI.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                { role: "system", content: "Você é um assistente que transforma textos livres em anotações organizadas. Sempre transforme em um JSON no formato tasks: [{content: 'TASK_HERE'}]" },
                { role: "user", content: `Agora, transforme o seguinte texto em um JSON conforme o formato esperado:\n"${this._text}"` }
            ],
            temperature: 0.7,
            response_format: {
                type: "json_object"
            }
        });

        const data = JSON.parse(response.choices[0]?.message?.content || "{}");
        if (!data || !Array.isArray(data.tasks)) return null;

        // ===== DEFINE A MODEL
        var posts : Post[] = [];

        data.tasks.forEach((task: { content: string; }) => {
            posts.push(new Post(this._author, task.content));
        });

        // ===== REPOSITORY INTEGRATION
        for(const p of posts) {
            this._savePostRepository.save(p);
        }

        return posts;

    }
}