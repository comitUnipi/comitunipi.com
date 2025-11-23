interface KritikSaran {
  id: number;
  kategori: string;
  pesan: string;
}

interface Props {
  kritikSaran: KritikSaran[];
}

export default function TableKritikSaran({ kritikSaran }: Props) {
  function TruncateText({ text, limit }: { text: string; limit: number }) {
    const words = text.split(' ');
    const shortText = words.slice(0, limit).join(' ');
    const finalText = words.length > limit ? shortText + ' ...' : shortText;
    return <span>{finalText}</span>;
  }
  return (
    <div className="rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                No
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Kategori
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Pesan
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {kritikSaran.map((data, index) => (
              <tr
                key={data.id}
                className="hover:bg-muted/50 border-b transition-colors"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{data.kategori}</td>
                <td className="p-4">
                  <TruncateText
                    text={data.pesan}
                    limit={10}
                  />
                </td>
              </tr>
            ))}

            {kritikSaran.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-muted-foreground p-4 text-center"
                >
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
