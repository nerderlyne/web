import React from "react";

interface CardProps {
  title: string;
  link: string;
  notes: string;
  summary: string;
  date: string;
  author: string;
  type: string;
  topics: string[];
  contributors: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  link,
  notes,
  summary,
  date,
  author,
  type,
  topics,
  contributors,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <span className="text-gray-700 text-sm">{author}</span>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="mb-4">
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </div>
      <p className="text-gray-700 leading-snug mb-4">{summary}</p>
      <p className="text-gray-700 leading-snug mb-4">{notes}</p>
      <div className="flex items-center mb-2">
        <span className="text-gray-700 text-sm mr-2">{date}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="bg-gray-300 text-gray-700 text-xs px-2 rounded-full mr-2">
          {type}
        </span>
        {topics.map((topic) => (
          <span
            key={topic}
            className="bg-gray-300 text-gray-700 text-xs px-2 rounded-full mr-2"
          >
            {topic}
          </span>
        ))}
                {contributors.map((contributor) => (
          <span
            key={contributor}
            className="text-gray-700 text-sm"
          >
            {contributor}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
