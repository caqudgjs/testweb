"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dna, Download, Loader2 } from "lucide-react"

const API_BASE = "https://nifos.scnu.ac.kr"

interface ExtractionResult {
    geneId: string
    chromosome: string
    start: number
    end: number
    strand: string
    totalLength: number
    forwardExtension: number
    backwardExtension: number
    sequence: string
}

export default function GenomeExtractionTool() {
    const [folders, setFolders] = useState<string[]>([])
    const [selectedFolder, setSelectedFolder] = useState("")
    const [gffFiles, setGffFiles] = useState<string[]>([])
    const [fastaPath, setFastaPath] = useState("")
    const [selectedGff, setSelectedGff] = useState("")
    const [geneId, setGeneId] = useState("")
    const [forwardExtension, setForwardExtension] = useState("1000")
    const [backwardExtension, setBackwardExtension] = useState("1000")
    const [isLoading, setIsLoading] = useState(true)
    const [isExtracting, setIsExtracting] = useState(false)
    const [result, setResult] = useState<ExtractionResult | null>(null)

    useEffect(() => {
        const loadFolders = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/sequence/get_folders`)
                const json = await res.json()
                setFolders(json)
            } catch (err) {
                console.error("폴더 목록 로딩 실패:", err)
            } finally {
                setIsLoading(false)
            }
        }
        loadFolders()
    }, [])

    const handleFolderChange = async (folder: string) => {
        setSelectedFolder(folder)
        setSelectedGff("")
        setGffFiles([])
        setFastaPath("")
        setResult(null)

        try {
            const gffRes = await fetch(`${API_BASE}/api/sequence/get_gff_files?folder=${folder}`)
            const gffs = await gffRes.json()
            setGffFiles(gffs)

            const fastaRes = await fetch(`${API_BASE}/api/sequence/get_fasta_file?folder=${folder}`)
            const fastaJson = await fastaRes.json()
            setFastaPath(fastaJson.fasta)
        } catch (err) {
            console.error("GFF 또는 FASTA 로딩 실패:", err)
        }
    }

    const handleExtraction = async () => {
        if (!fastaPath || !selectedGff || !geneId.trim()) {
            alert("모든 필드를 입력하세요.")
            return
        }

        setIsExtracting(true)
        setResult(null)

        try {
            const res = await fetch(`${API_BASE}/api/sequence/extract_sequence`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fasta_path: fastaPath,
                    gff_path: `/var/www/html/jbrowse/data/${selectedFolder}/${selectedGff}`,
                    gene_id: geneId,
                    forward_extension: parseInt(forwardExtension),
                    backward_extension: parseInt(backwardExtension),
                }),
            })

            const json = await res.json()
            if (json.error) {
                alert("오류: " + json.error)
            } else {
                setResult(json)
            }
        } catch (e) {
            alert("서버 요청 실패: " + e)
        } finally {
            setIsExtracting(false)
        }
    }

    const formatSequence = (seq: string) => {
        const lines = []
        for (let i = 0; i < seq.length; i += 80) {
            lines.push(seq.slice(i, i + 80))
        }
        return lines
    }

    const handleDownload = () => {
        if (!result) return
        const content = `>${result.geneId} ${result.chromosome} ${result.start}-${result.end} ${result.strand}\n${result.sequence}`
        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${result.geneId}_sequence.fasta`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-5">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Dna className="w-5 h-5" /> 유전자 서열 추출기
            </h3>

            {/* 폴더 선택 */}
            <div className="space-y-2">
                <Label>1. 폴더 선택</Label>
                <Select value={selectedFolder} onValueChange={handleFolderChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="폴더를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {folders.map((folder) => (
                            <SelectItem key={folder} value={folder}>
                                {folder}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* GFF 선택 */}
            {gffFiles.length > 0 && (
                <div className="space-y-2">
                    <Label>2. GFF 파일 선택</Label>
                    <Select value={selectedGff} onValueChange={setSelectedGff}>
                        <SelectTrigger>
                            <SelectValue placeholder="GFF 파일 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {gffFiles.map((file) => (
                                <SelectItem key={file} value={file}>
                                    {file}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* 입력 */}
            <div className="grid grid-cols-3 gap-3">
                <div>
                    <Label>Gene ID</Label>
                    <Input value={geneId} onChange={(e) => setGeneId(e.target.value)} placeholder="예: g100" />
                </div>
                <div>
                    <Label>Forward 확장</Label>
                    <Input type="number" value={forwardExtension} onChange={(e) => setForwardExtension(e.target.value)} />
                </div>
                <div>
                    <Label>Backward 확장</Label>
                    <Input type="number" value={backwardExtension} onChange={(e) => setBackwardExtension(e.target.value)} />
                </div>
            </div>

            {/* 실행 버튼 */}
            <div className="flex justify-center pt-2">
                <Button
                    onClick={handleExtraction}
                    disabled={isExtracting || !selectedFolder || !selectedGff || !geneId.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {isExtracting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            서열 추출 중...
                        </>
                    ) : (
                        <>
                            <Dna className="w-4 h-4 mr-2" />
                            서열 추출 실행
                        </>
                    )}
                </Button>
            </div>



            {/* 결과 */}
            {result && (
                <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                        <p className="font-mono text-sm">
                            {">"} {result.geneId} {result.chromosome} {result.start}-{result.end} {result.strand} ({result.totalLength} bp)
                        </p>
                        <Button size="sm" variant="outline" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-1"/> 다운로드
                        </Button>
                    </div>
                    <div
                        className="font-mono text-xs bg-gray-100 p-3 rounded max-h-64 overflow-y-auto select-text"
                        style={{
                            whiteSpace: "normal",         // 자동 줄바꿈 허용
                            wordBreak: "break-word",      // 단어 중간이라도 줄바꿈 허용
                        }}
                        dangerouslySetInnerHTML={{__html: result.sequence}}
                    ></div>

                </div>
            )}
        </div>
    )
}
