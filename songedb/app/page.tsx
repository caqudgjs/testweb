import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Database, Search, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">송이 & 천마 유전체 데이터베이스</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            송이와 천마의 유전체 정보와 연구 데이터를 제공하는 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/tools">
                <Database className="w-5 h-5 mr-2" />
                데이터베이스 탐색
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                <BookOpen className="w-5 h-5 mr-2" />
                자세히 알아보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tricholoma matsutake Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <Image
                  src="/songe.jpg"
                  alt="송이버섯"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">송이버섯 (<i>Tricholoma matsutake)</i></CardTitle>
                <CardDescription className="text-gray-600">한국의 대표적인 고급 식용버섯</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  송이버섯은 한국, 일본, 중국 등 동아시아 지역에서 자생하는 고급 식용버섯으로, 독특한 향과 맛으로
                  유명함. 소나무와 공생하며 현재 자연 상태에서만 채취 가능함.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">식용버섯</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">공생균근</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">고급식재료</span>
                </div>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/about#matsutake">
                    <Search className="w-4 h-4 mr-2" />
                    상세 정보 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Gastrodia elata Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                  className="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                <div className="w-[300px] h-[170px] rounded-lg overflow-hidden">
                  <Image
                      src="/ge.jpg"
                      alt="천마"
                      width={300}
                      height={200}
                      className="object-cover"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">천마 (<i>Gastrodia elata</i>)</CardTitle>
                <CardDescription className="text-gray-600">전통 한의학의 귀중한 약재</CardDescription>
              </CardHeader>
              <CardContent>
              <p className="text-gray-700 mb-4">
                  천마는 난초과에 속하는 다년생 균종속영양 식물로, 한의학에서 신경계 질환과 두통 치료에 사용되는 중요한
                  약재임. 뿌리줄기가 약용 부위로 활용됨.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">한약재</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">균종속영양</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">신경계</span>
                </div>
                <br></br>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/about#gastrodia">
                    <Search className="w-4 h-4 mr-2" />
                    상세 정보 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">데이터베이스 주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">포괄적인 데이터</h3>
              <p className="text-gray-600">형태학적 특성, 생태학적 정보, 분포 현황 등 상세한 데이터 제공</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">고급 검색</h3>
              <p className="text-gray-600">다양한 필터와 검색 옵션으로 원하는 정보를 빠르게 찾기</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">연구 자료</h3>
              <p className="text-gray-600">최신 연구 논문과 학술 자료를 통한 과학적 정보 제공</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
