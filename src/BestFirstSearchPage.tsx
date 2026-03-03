import { useRef, useState } from "react";
import type { Step, Graph } from "./Type";
import bestFirstSearch from "./utils/BestFirstSearch";
import { parseInput } from "./utils/ParseInput";
import { Import, Info, RotateCcw, Play, FileDown } from "lucide-react";
const DEFAULT_INPUT = `
A
B
A - 20: C D E
C - 15: F
D - 6: F I
F - 10: B
I - 8: B G
E - 7: K G
G - 5: B H
H - 12: B
B - 0:
`;
export default function BestFirstSearchPage() {
    const [input, setInput] = useState(DEFAULT_INPUT.trim());
    const [steps, setSteps] = useState<Step[]>([]);
    const [graph, setGraph] = useState<Graph>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSolve = () => {
        const parsedGraph = parseInput(input);
        if (!parsedGraph) {
            setSteps([]);
            return;
        }
        setGraph(parsedGraph);
        const result = bestFirstSearch(parsedGraph);
        setSteps(result);
        result.forEach((e) => {
            console.log(e);
        });
    };

    const handleReset = () => {
        setInput("");
        setSteps([]);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setInput(String(ev.target?.result || ""));
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        const blob = new Blob([input], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graph.txt";
        a.click();
        URL.revokeObjectURL(url);
    };
    console.log(steps);
    return (
        <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0] flex flex-col">
            <header className="border-b border-[#141414] p-6 flex">
                <div>
                    <h1 className="font-serif italic text-3xl tracking-tight">
                        Best-First Search
                    </h1>
                    <p className="text-[11px] uppercase tracking-widest opacity-50 mt-1">
                        Algorithm Solve
                    </p>
                </div>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-12 flex flex-1 overflow-hidden">
                <div className="lg:col-span-4 border-r border-[#141414] flex flex-col h-full overflow-hidden">
                    <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                        <section className="animate-in fade-in slide-in-from-left-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-serif italic text-sm uppercase opacity-50 tracking-wider">
                                    Graph Input
                                </h2>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-1 border border-[#141414] rounded hover:bg-[#141414] hover:text-[#E4E3E0] transition-all"
                                        title="Import"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <Import size={14} />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".txt"
                                        className="hidden"
                                        onChange={handleImport}
                                    />
                                    <div className="group relative">
                                        <Info
                                            size={14}
                                            className="opacity-30 cursor-help"
                                        />
                                        <div className="absolute right-0 top-6 w-64 p-3 bg-white border border-[#141414] rounded shadow-xl text-[10px] hidden group-hover:block z-50">
                                            <p className="font-bold mb-1">
                                                Format:
                                            </p>
                                            <p>
                                                Dòng 1: Trạng thái đầu (VD: A)
                                            </p>
                                            <p>
                                                Dòng 2: Trạng thái kết thúc (VD:
                                                B)
                                            </p>
                                            <p>
                                                Các dòng sau: Node - Trọng số:
                                                Các node kề
                                            </p>
                                            <p className="mt-2 italic opacity-70">
                                                VD: A - 20: C D E
                                            </p>
                                            <p className="italic opacity-70">
                                                Lưu ý phải viết cả node không có
                                                các node kề
                                            </p>
                                            <p className="italic opacity-70">
                                                VD: B - 1:
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <textarea
                                className="w-full h-96 bg-transparent border border-[#141414] p-4 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#141414] resize-none"
                                placeholder="Nhập vào dữ liệu trạng thái đầu, trạng thái kết lúc và đồ thị..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </section>
                        <div className="flex flex-col gap-6">
                            <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
                                <h2 className="font-serif italic text-sm uppercase opacity-50 tracking-wider">
                                    Graph Solve
                                </h2>
                                <div className="grid grid-cols-4 gap-2">
                                    <button
                                        className="flex flex-col items-center justify-center p-3 border border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] transition-all"
                                        onClick={handleReset}
                                    >
                                        <RotateCcw size={18} />
                                        <span className="text-[9px] mt-1 uppercase font-bold">
                                            Reset
                                        </span>
                                    </button>
                                    <button
                                        className="col-span-2 flex flex-col items-center justify-center p-3 border border-[#141414] bg-[#141414] text-[#E4E3E0] hover:opacity-90 transition-all"
                                        onClick={handleSolve}
                                    >
                                        <Play size={18} />
                                        <span className="text-[9px] mt-1 uppercase font-bold">
                                            Solve
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleExport}
                                        className="flex flex-col items-center justify-center p-3 border border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] transition-all "
                                    >
                                        <FileDown size={18} />
                                        <span className="text-[9px] mt-1 uppercase font-bold">
                                            Export
                                        </span>
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-8 p-6 flex flex-col gap-6 overflow-hidden">
                    <div className="flex-1 min-h-0 overflow-auto">
                        {steps.length === 0 ? (
                            <div className="text-center text-lg opacity-60 mt-20">
                                Nhấn Solve để xem các bước thuật toán.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-[#141414] text-xs">
                                    <thead>
                                        <tr className="bg-[#141414] text-[#E4E3E0]">
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Bước
                                            </th>
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Phát triển trạng thái
                                            </th>
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Trạng thái kề
                                            </th>
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Danh sách đang xét (L)
                                            </th>
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Danh sách đã đi qua (D)
                                            </th>
                                            <th className="px-2 py-1 border border-[#141414]">
                                                Quãng đường
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {steps.map((s, idx) => (
                                            <tr
                                                key={idx}
                                                className="odd:bg-[#E4E3E0] even:bg-white"
                                            >
                                                <td className="border border-[#141414] text-center">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-2 py-1 border border-[#141414] text-center">
                                                    <span className="inline-block px-2 py-1 rounded border border-orange-400 bg-orange-50 text-orange-800 text-xs font-mono">
                                                        {s.current}
                                                        {s.current && (
                                                            <span className="opacity-70">
                                                                {" "}
                                                                (h ={" "}
                                                                {
                                                                    graph
                                                                        ?.nodes[
                                                                        s
                                                                            .current
                                                                    ]?.heuristic
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-1 border border-[#141414] text-center">
                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                        {(
                                                            (s.current &&
                                                                graph?.nodes[
                                                                    s.current
                                                                ]?.neighbors) ||
                                                            []
                                                        ).map((n) => (
                                                            <span
                                                                key={n}
                                                                className="inline-block px-2 py-1 rounded border border-blue-400 bg-blue-50 text-blue-800 text-xs font-mono"
                                                            >
                                                                {n}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 border border-[#141414] text-center">
                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                        {s.L.map((n) => (
                                                            <span
                                                                key={n.id}
                                                                className="inline-block px-2 py-1 rounded border border-gray-400 bg-gray-50 text-gray-800 text-xs font-mono"
                                                            >
                                                                {n.id}
                                                                <span className="opacity-70">
                                                                    (h ={" "}
                                                                    {
                                                                        n.heuristic
                                                                    }
                                                                    )
                                                                </span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 border border-[#141414] text-center">
                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                        {s.D.map((n) => (
                                                            <span
                                                                key={n}
                                                                className="inline-block px-2 py-1 rounded border border-gray-300 bg-white text-gray-800 text-xs font-mono"
                                                            >
                                                                {n}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 border border-[#141414] text-center">
                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                        {s.path.map(
                                                            (n, idx2) => (
                                                                <span
                                                                    key={
                                                                        n + idx2
                                                                    }
                                                                    className="inline-block px-2 py-1 rounded border border-green-400 bg-green-50 text-green-800 text-xs font-mono"
                                                                >
                                                                    {n}
                                                                    {idx2 <s.path.length -1 && (
                                                                        <span className="text-green-700 font-bold">
                                                                            {" "}
                                                                            →{" "}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {steps.length > 0 && (
                                    <div className="mt-6 p-4 border border-[#141414] bg-[#E4E3E0]">
                                        <h3 className=" italic text-sm uppercase opacity-50 tracking-wider mb-4">
                                            Kết quả
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="border border-[#141414] p-3 rounded">
                                                <p className="text-[10px] uppercase opacity-50 mb-2">
                                                    Quãng đường
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {steps[
                                                        steps.length - 1
                                                    ].path.map((n, idx) => (
                                                        <span
                                                            key={n + idx}
                                                            className="inline-block px-2 py-1 rounded border border-green-400 bg-green-50 text-green-800 text-xs font-mono"
                                                        >
                                                            {n}
                                                            {idx <steps[steps.length -1].path.length-1 && (
                                                                <span className="text-green-700 font-bold">
                                                                    {" "}
                                                                    →{" "}
                                                                </span>
                                                            )}  
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border border-[#141414] p-3 rounded">
                                                <p className="text-[10px] uppercase opacity-50 mb-2">
                                                    Số bước
                                                </p>
                                                <p className="text-2xl font-bold">
                                                    {steps[steps.length-1]
                                                        .path.length}

                                                </p>
                                            </div>

                                            <div className="border border-[#141414] p-3 rounded">
                                                <p className="text-[10px] uppercase opacity-50 mb-2">
                                                    Tổng trọng số
                                                </p>
                                                <p className="text-2xl font-bold">
                                                    {steps[
                                                        steps.length - 1
                                                    ].path.reduce(
                                                        (sum, nodeId) =>
                                                            sum +
                                                            (graph?.nodes[
                                                                nodeId
                                                            ]?.heuristic || 0),
                                                        0,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
