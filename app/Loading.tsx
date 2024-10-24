// app/components/Loading.tsx
export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 8px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #000;
                    border-radius: 50%;
                    width: 64px;
                    height: 64px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};
