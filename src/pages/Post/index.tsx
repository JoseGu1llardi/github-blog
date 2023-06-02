import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/axios";

import { IPost } from "../Blog";

import { PostHeader } from "./components/PostHeader";
import { useParams } from "react-router-dom";
import { PostContent } from "./components/PostContent";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const repoName = import.meta.env.VITE_GITHUB_REPONAME;

export function Post() {
    const [postData, setPostData] = useState<IPost>({} as IPost);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const getPostsDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/repos/${username}/${repoName}/issues/${id}`);

            setPostData(response.data);
        } finally {
            setIsLoading(false);
        }
    }, [postData]);

    useEffect(() => {
        getPostsDetails();
    }, []);

    return (
        <>
            <PostHeader isLoading={isLoading} postData={postData} />
            {!isLoading && <PostContent content={postData.body} />}
        </>
    )
}