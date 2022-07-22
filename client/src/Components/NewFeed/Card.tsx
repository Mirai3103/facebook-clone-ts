import React from 'react';

interface NewFeedProps {
    className?: string | '';
    children?: React.ReactNode;
}

export default function NewFeedCard({ className, children }: NewFeedProps) {
    return (
        <div className={`bg-white w-full rounded-lg border-solid border shadow-fb mt-4 ${className}`}>
            {children}
        </div>
    )
}