export function Preview({ htmlFile }) {
  return (
    <div className="w-1/4 bg-gray-50 p-4 rounded shadow overflow-auto">
      <h4 className="font-semibold mb-2">Live Preview</h4>
      <div
        dangerouslySetInnerHTML={{ __html: htmlFile?.content || '<p>Nothing to preview</p>' }}
        className="border p-2 rounded bg-white"
      />
    </div>
  );
}