import { SppinerContainer } from "./styles";

export function Spinner() {
    return (
        <SppinerContainer>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </SppinerContainer>
    )
}