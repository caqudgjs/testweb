"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function JBrowseTool() {
  const handleJBrowseOpen = () => {
    window.open("https://jbrowse.org/jb2/", "_blank")
  }

  return (
      <div className="flex-1 flex flex-col space-y-4 h-full">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              JBrowse2 게놈 브라우저
            </CardTitle>
            <CardDescription>
              송이버섯과 천마의 게놈 데이터를 시각적으로 탐색할 수 있는 브라우저입니다.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* 송이버섯 카드 */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-amber-800">송이버섯 게놈</CardTitle>
                  <CardDescription className="text-amber-600">Tricholoma matsutake 게놈 브라우저</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleJBrowseOpen} className="w-full bg-amber-600 hover:bg-amber-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    JBrowse2에서 열기
                  </Button>
                </CardContent>
              </Card>

              {/* 천마 카드 */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-800">천마 게놈</CardTitle>
                  <CardDescription className="text-purple-600">Gastrodia elata 게놈 브라우저</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleJBrowseOpen} className="w-full bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    JBrowse2에서 열기
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">사용 방법:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 위 버튼을 클릭하여 JBrowse2 외부 사이트로 이동합니다</li>
                <li>• 게놈 트랙을 선택하여 유전자, 주석 정보를 확인할 수 있습니다</li>
                <li>• 검색 기능을 통해 특정 유전자나 영역을 찾을 수 있습니다</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
