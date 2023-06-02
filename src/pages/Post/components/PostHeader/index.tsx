import { useNavigate } from "react-router-dom";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { faCalendar, faCircleChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ExternalLink } from "../../../../components/ExternalLink";

import { PostHeaderContainer } from "./styles";

import { IPost } from "../../../Blog";

import { Spinner } from "../../../../components/Spinner";

import { relativeDateFormatter } from "../../../../utils/formatter";

interface PostHeaderProps {
    postData: IPost;
    isLoading: boolean;
}

export function PostHeader({ postData, isLoading }: PostHeaderProps) {
    const navigate = useNavigate();
    const formattedDate = relativeDateFormatter(postData?.created_at);

    return (
        <PostHeaderContainer>
            {
                isLoading ? <Spinner /> : (
                    <>
                        <header>
                            <ExternalLink
                                as="button"
                                text="Back"
                                variant="iconLeft"
                                onClick={() => navigate(-1)}
                                icon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
                            />
                            <ExternalLink text="See on Github" href={postData.html_url} target='_blank' />
                        </header>

                        <h1>{postData.title}</h1>

                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faGithub} />
                                {postData.user.login}
                            </li>

                            <li>
                                <FontAwesomeIcon icon={faCalendar} />
                                {formattedDate}
                            </li>

                            <li>
                                <FontAwesomeIcon icon={faComment} />
                                {postData.comments} reviews
                            </li>
                        </ul>
                    </>
                )
            }

        </PostHeaderContainer>
    )
}