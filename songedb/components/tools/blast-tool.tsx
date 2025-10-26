"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowLeft, ExternalLink, Copy } from "lucide-react"

// BLAST 결과 인터페이스 정의
interface BlastResult {
  id: string
  description: string
  organism: string
  score: number
  eValue: string
  identity: string
  coverage: string
  accession: string
  length: number
}

// 데이터베이스 이름에서 생물종 추출 함수
function getOrganismFromDbName(dbName: string): string {
  const lower = dbName.toLowerCase()
  if (lower.includes("gastrodiaelata")) return "Gastrodia elata"
  if (lower.includes("songe")) return "Tricholoma matsutake"
  return "Unknown"
}

export default function BlastTool() {
  const [blastType, setBlastType] = useState("blastn")
  const [blastDbs, setBlastDbs] = useState<string[]>([])
  const [selectedDb, setSelectedDb] = useState<string>("")
  const [fastaQuery, setFastaQuery] = useState("")
  const [isBlastRunning, setIsBlastRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<BlastResult[]>([])
  const [alignmentRaw, setAlignmentRaw] = useState("")

  // BLAST DB 목록 불러오기
  useEffect(() => {
    const fetchDbs = async () => {
      try {
        const res = await axios.get(`https://nifos.scnu.ac.kr/api/blast/dbs?blast_type=${blastType}`)
        setBlastDbs(res.data.blast_dbs)
        setSelectedDb(res.data.blast_dbs[0] || "")
      } catch (err) {
        console.error("DB 목록 불러오기 실패", err)
        setBlastDbs([])
        setSelectedDb("")
      }
    }
    fetchDbs()
  }, [blastType])

  // BLAST 실행 함수
  const handleBlastRun = async () => {
    if (!fastaQuery.trim()) {
      alert("FASTA 서열을 입력해주세요.")
      return
    }
    if (!selectedDb) {
      alert("데이터베이스를 선택해주세요.")
      return
    }

    setIsBlastRunning(true)
    try {
      const res = await axios.post("https://nifos.scnu.ac.kr/api/blast/run", {
        blast_type: blastType,
        blast_db: selectedDb,
        query: fastaQuery
      })

      console.log("BLAST 응답:", res.data)

      if (res.data?.error) {
        alert("서버 오류: " + res.data.error)
        return
      }

      const tableRaw = res.data?.result?.table
      const alignmentRawText = res.data?.result?.alignment

      if (!tableRaw || !alignmentRawText) {
        alert("BLAST 결과가 유효하지 않습니다.")
        return
      }

      const tableResult = tableRaw.trim()
      const alignment = alignmentRawText.trim()
      setAlignmentRaw(alignment)

      const lines = tableResult.split("\n")
      const organismName = getOrganismFromDbName(selectedDb)

      // BLAST 결과 파싱
      const parsed = lines.map((line, i) => {
        const parts = line.split("\t")
        if (parts.length < 12) return null  // 잘못된 라인 방지

        const [
          qseqid, sseqid, pident, alignLength,
          mismatch, gapopen, qstart, qend,
          sstart, send, evalue, bitscore
        ] = parts

        return {
          id: `${i}`,
          description: sseqid,
          organism: organismName,
          score: parseFloat(bitscore),
          eValue: evalue,
          identity: `${parseFloat(pident).toFixed(2)}%`,
          coverage: `${((parseInt(alignLength) / fastaQuery.replace(/^>.*$/gm, "").replace(/\s/g, "").length) * 100).toFixed(1)}%`,
          accession: sseqid,
          length: parseInt(alignLength),
        }
      }).filter(Boolean) // null 제거


      setResults(parsed)
      setShowResults(true)

    } catch (err) {
      alert("BLAST 실행 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsBlastRunning(false)
    }
  }

  const handleBackToSearch = () => {
    setShowResults(false)
    setResults([])
    setAlignmentRaw("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("클립보드에 복사되었습니다.")
  }

  // 결과 화면
  if (showResults) {
    return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Search className="w-5 h-5" /> BLAST 검색 결과
              </h2>
              <p className="text-sm text-muted-foreground">
                {blastType.toUpperCase()} 검색 결과 - {results.length}개의 유사 서열
              </p>
            </div>
            <Button onClick={handleBackToSearch} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> 새 검색
            </Button>
          </div>

          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">표 형태</TabsTrigger>
              <TabsTrigger value="alignment">정렬 결과</TabsTrigger>
            </TabsList>

            {/* 표 결과 */}
            <TabsContent value="table" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>설명</TableHead>
                      <TableHead>생물종</TableHead>
                      <TableHead>점수</TableHead>
                      <TableHead>E-value</TableHead>
                      <TableHead>일치율</TableHead>
                      <TableHead>커버리지</TableHead>
                      <TableHead>길이</TableHead>
                      <TableHead>액션</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{result.description}</div>
                              <div className="text-xs text-gray-500">Accession: {result.accession}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={result.organism.includes("matsutake") ? "default" : "secondary"}>
                              {result.organism}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono">{result.score}</TableCell>
                          <TableCell className="font-mono">{result.eValue}</TableCell>
                          <TableCell>
                            <Badge variant={parseFloat(result.identity) > 90 ? "default" : "secondary"}>
                              {result.identity}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.coverage}</TableCell>
                          <TableCell className="font-mono">{result.length} bp</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => copyToClipboard(result.accession)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 정렬 결과 출력 */}
            <TabsContent value="alignment" className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-muted p-4 rounded-md">
                <div className="font-semibold">정렬 결과 (outfmt 0)</div>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                {alignmentRaw || "정렬 결과가 없습니다."}
              </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
    )
  }

  // 입력 화면
  return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>BLAST 유형 선택</Label>
            <Select value={blastType} onValueChange={setBlastType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="blastn">BLASTN</SelectItem>
                <SelectItem value="blastp">BLASTP</SelectItem>
                <SelectItem value="blastx">BLASTX</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>데이터베이스 선택</Label>
            <Select value={selectedDb} onValueChange={setSelectedDb}>
              <SelectTrigger><SelectValue placeholder="DB 선택" /></SelectTrigger>
              <SelectContent>
                {blastDbs.map((db) => (
                    <SelectItem key={db} value={db}>{db}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fasta-query">FASTA 서열 입력</Label>
          <Textarea
              id="fasta-query"
              value={fastaQuery}
              onChange={(e) => setFastaQuery(e.target.value)}
              rows={8}
              className="font-mono text-sm"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            서열 길이: {fastaQuery.replace(/^>.*$/gm, "").replace(/\s/g, "").length} bp/aa
          </div>
          <Button
              onClick={handleBlastRun}
              disabled={isBlastRunning || !fastaQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700"
          >
            {isBlastRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  BLAST 실행 중...
                </>
            ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  BLAST 실행
                </>
            )}
          </Button>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg text-sm">
          <ul className="space-y-1 text-yellow-800">
            <li>• FASTA 형식으로 서열을 입력하세요 (헤더 라인은 &gt;로 시작)</li>
            <li>• DNA는 A,T,G,C / 단백질은 아미노산 코드로 작성</li>
            <li>• 유사도 높은 순서로 결과 정렬됨</li>
          </ul>
        </div>
      </div>
  )
}
