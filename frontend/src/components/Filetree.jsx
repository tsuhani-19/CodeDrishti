import React from 'react';

export default function FileTree({ files = [], onSelect }) {
  return (
    <div className="p-4 rounded bg-gray-100 overflow-y-auto max-h-[500px]">
      <h3 className="font-semibold text-indigo-700 mb-3">📁 Files</h3>
      <ul className="space-y-1">
        {files.length === 0 ? (
          <li className="text-gray-500">No files generated yet.</li>
        ) : (
          files.map((file, idx) => (
            <li
              key={idx}
              onClick={() => onSelect(file)}
              className="cursor-pointer px-3 py-1 rounded hover:bg-indigo-100 hover:text-indigo-700 text-sm font-medium text-gray-800"
            >
              {file.path}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
