"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Folder, FolderOpen, File, ChevronRight, ChevronDown } from "lucide-react"

const API_BASE = "https://nifos.scnu.ac.kr/api"

interface FileEntry {
    name: string
}

interface FolderNode {
    name: string
    path: string
    children?: FileEntry[]
    isOpen: boolean
}

const getFileDescription = (ext: string) => {
    switch (ext.toLowerCase()) {
        case "fna":
            return "게놈 또는 CDS 서열"
        case "faa":
            return "단백질 서열"
        case "gff":
            return "유전자 또는 반복서열 주석"
        case "gz":
            return "압축된 주석 파일"
        case "tbi":
            return "압축 주석 인덱스"
        case "fai":
            return "FASTA 인덱스"
        case "masked":
            return "마스킹된 게놈 서열"
        default:
            return "기타 파일"
    }
}

const getFileTypeColor = (ext: string) => {
    switch (ext.toLowerCase()) {
        case "fna":
            return "bg-blue-100 text-blue-800"
        case "faa":
            return "bg-green-100 text-green-800"
        case "gff":
            return "bg-purple-100 text-purple-800"
        case "fai":
            return "bg-gray-100 text-gray-800"
        case "gz":
            return "bg-orange-100 text-orange-800"
        case "tbi":
            return "bg-yellow-100 text-yellow-800"
        case "masked":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

function FolderTree({
                        folder,
                        onToggle,
                        onDownload
                    }: {
    folder: FolderNode
    onToggle: (folder: FolderNode) => void
    onDownload: (folderPath: string, fileName: string) => void
}) {
    return (
        <div>
            <div
                className="flex items-center gap-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => onToggle(folder)}
            >
                {folder.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {folder.isOpen ? <FolderOpen className="w-4 h-4 text-blue-600" /> : <Folder className="w-4 h-4 text-blue-600" />}
                <span className="font-medium">{folder.name}</span>
            </div>
            {folder.isOpen && folder.children && (
                <div className="ml-6 border-l border-gray-200 pl-2">
                    {folder.children.map((file, i) => (
                        <div key={i} className="flex justify-between items-center px-2 py-1 hover:bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                                <File className="w-4 h-4 text-gray-500" />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{file.name}</span>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs ${getFileTypeColor(file.name.split('.').pop() || "")}`}
                                        >
      {file.name.split('.').pop()?.toUpperCase()}
    </span>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-0.5">
    {getFileDescription(file.name.split('.').pop() || "")}
  </span>
                                </div>


                            </div>
                            <Button size="sm" variant="outline" onClick={() => onDownload(folder.path, file.name)}>
                                <Download className="w-3 h-3"/>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function FtpTool() {
    const [folders, setFolders] = useState<FolderNode[]>([])

    useEffect(() => {
        fetch(`${API_BASE}/ftp/folders`)
            .then(res => res.json())
            .then(data => {
                const folderNodes = data.folders.map((path: string) => {
                    const parts = path.split("/")
                    return {
                        name: parts[parts.length - 1],
                        path,
                        isOpen: false
                    }
                })
                setFolders(folderNodes)
            })
    }, [])

    const toggleFolder = (folder: FolderNode) => {
        if (folder.isOpen) {
            setFolders(prev => prev.map(f => f.path === folder.path ? { ...f, isOpen: false } : f))
        } else {
            fetch(`${API_BASE}/ftp/files?folder=${encodeURIComponent(folder.path)}`)
                .then(res => res.json())
                .then(data => {
                    setFolders(prev => prev.map(f =>
                        f.path === folder.path
                            ? { ...f, isOpen: true, children: data.files.map((name: string) => ({ name })) }
                            : f
                    ))
                })
        }
    }

    const handleDownload = (folderPath: string, fileName: string) => {
        const url = `${API_BASE}/ftp/download?folder=${encodeURIComponent(folderPath)}&filename=${encodeURIComponent(fileName)}`
        window.open(url, "_blank")
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="w-5 h-5"/>
                        FTP 파일 다운로드
                    </CardTitle>
                    <CardDescription>
                        송이버섯과 천마의 게놈, 전사체, 단백질 서열 파일을 폴더 구조로 탐색하고 다운로드할 수 있습니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-h-96 overflow-y-auto border rounded p-3 bg-gray-50">
                        {folders.map((folder, i) => (
                            <FolderTree
                                key={i}
                                folder={folder}
                                onToggle={toggleFolder}
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>

                    {/* 설명 카드 추가 */}
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-3 rounded border">
                            <h4 className="font-medium mb-2 text-sm">파일 유형 설명</h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">FNA</span>
                                    <span>게놈 또는 CDS 서열 파일 (.fna)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800">FAA</span>
                                    <span>단백질 서열 파일 (.faa)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">GFF</span>
                                    <span>유전자 또는 반복서열 주석 (.gff)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">GZ</span>
                                    <span>압축된 주석 파일 (.gz)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">TBI</span>
                                    <span>압축 주석 파일의 인덱스 (.gz.tbi)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">FAI</span>
                                    <span>FASTA 형식의 서열 인덱스 (.fna.fai, .faa.fai)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800">MASKED</span>
                                    <span>반복서열이 마스킹된 게놈 서열 (.fna.masked)</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded">
                            <h4 className="font-medium text-green-800 mb-2 text-sm">다운로드 안내</h4>
                            <ul className="text-xs text-green-700 space-y-0.5">
                                <li>• 폴더를 클릭하여 내용을 확장/축소할 수 있습니다</li>
                                <li>• 각 파일의 다운로드 버튼을 클릭하여 다운로드</li>
                                <li>• 대용량 파일은 다운로드에 시간이 소요됩니다</li>
                                <li>• 연구 목적으로만 사용해주세요</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
