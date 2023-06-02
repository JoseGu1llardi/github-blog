import { z } from "zod";
import { SearchInputContainer } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
    query: z.string()
});

type SearchFormInput = z.infer<typeof searchSchema>;

interface SearchInputProps {
    postsLength: number;
    getPosts: (query?: string) => Promise<void>;
}

export function SearchInput({ postsLength, getPosts }: SearchInputProps) {
    const { register, handleSubmit } = useForm<SearchFormInput>({
        resolver: zodResolver(searchSchema)
    });

    async function handleSearchPosts(data: SearchFormInput) {
        await getPosts(data.query);
    }

    return (
        <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
            <header>
                <h3>Posts</h3>
                <span>{postsLength}</span>
            </header>

            <input type="text" placeholder="Search content" {...register('query')} />
        </SearchInputContainer>
    )
}