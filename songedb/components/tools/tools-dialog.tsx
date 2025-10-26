"use client"

import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Database } from "lucide-react"

import JBrowseTool from "./jbrowse-tool"
import BlastTool from "./blast-tool"
import FtpTool from "./ftp-tool"
import GenomeExtractionTool from "./genome-extraction-tool"


export default function ToolsDialog({ children }: { children: React.ReactNode }) {
  const handleDialogClick = (e: React.MouseEvent) => {
    // 모바일 Sheet 안에서 닫히는 것 방지
    e.stopPropagation()
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <div onClick={handleDialogClick}>
            {children}
          </div>
        </DialogTrigger>

        <DialogContent className="w-[95vw] !max-w-[95vw] h-[85vh] p-4">
          <div className="flex flex-col h-full overflow-auto">
            {/* 상단 헤더 */}
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                생물정보학 도구
              </DialogTitle>
              <DialogDescription>
                송이버섯과 천마 연구를 위한 다양한 생물정보학 도구들을 제공합니다.
              </DialogDescription>
            </DialogHeader>

            {/* 탭 영역 */}
            <Tabs defaultValue="jbrowse" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="jbrowse">JBrowse2</TabsTrigger>
                <TabsTrigger value="blast">BLAST</TabsTrigger>
                <TabsTrigger value="ftp">FTP 다운로드</TabsTrigger>
                <TabsTrigger value="extraction">서열 추출</TabsTrigger>
              </TabsList>

              {/* JBrowse 탭 */}
              <TabsContent value="jbrowse" className="flex-1 flex flex-col mt-4 overflow-hidden">
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader>
                    <CardTitle>JBrowse2 브라우저</CardTitle>
                    <CardDescription>게놈 시각화 도구</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto overflow-x-hidden">
                    <JBrowseTool />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BLAST 탭 */}
              <TabsContent value="blast" className="flex-1 flex flex-col mt-4 overflow-hidden">
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader>
                    <CardTitle>BLAST 검색</CardTitle>
                    <CardDescription>입력한 서열과 유사한 서열을 검색합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto overflow-x-auto whitespace-pre-wrap min-h-0">
                    <BlastTool />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FTP 탭 */}
              <TabsContent value="ftp" className="flex-1 flex flex-col mt-4 overflow-hidden">
                <Card className="flex-1 flex flex-col overflow-hidden">
                  <CardHeader>
                    <CardTitle>FTP 다운로드</CardTitle>
                    <CardDescription>게놈 데이터 파일을 다운로드할 수 있습니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
                    <FtpTool />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="extraction">
                <GenomeExtractionTool />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
  )
}
