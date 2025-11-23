interface KritikSaran {
  id: number;
  kategori: string;
  pesan: string;
  created_at: string;
}

interface Props {
  kritikSaran: KritikSaran[];
  from: number;
}

export default function TableKritikSaran({ kritikSaran, from }: Props) {
  function TruncateText({ text, limit }: { text: string; limit: number }) {
    const words = text.split(' ');
    const shortText = words.slice(0, limit).join(' ');
    const finalText = words.length > limit ? shortText + ' ...' : shortText;
    return <span>{finalText}</span>;
  }

  const categoryColor = (category: string) => {
    switch (category) {
      case 'Pelatihan Akademik':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Kepengurusan':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors">
              <th className="text-muted-foreground h-12 w-[50px] px-4 text-left align-middle font-medium">
                No
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                Kategori
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                Pesan
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {kritikSaran.length > 0 ? (
              kritikSaran.map((data, index) => (
                <tr
                  key={data.id}
                  className="hover:bg-muted/50 border-b transition-colors"
                >
                  <td className="p-4 align-middle font-medium">
                    {from + index}
                  </td>
                  <td className="p-4 align-middle">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${categoryColor(
                        data.kategori,
                      )}`}
                    >
                      {data.kategori}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <TruncateText
                      text={data.pesan}
                      limit={10}
                    />
                  </td>
                  <td className="p-4 align-middle">
                    {new Date(data.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-muted-foreground h-24 p-4 text-center"
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
