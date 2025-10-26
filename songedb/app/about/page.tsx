import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Leaf, Microscope } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">소개</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            송이과 천마에 대한 상세한 정보와 과학적 데이터를 제공
          </p>
        </div>

        {/* Tricholoma matsutake Section */}
        <section id="matsutake" className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                송이 (<i>Tricholoma matsutake</i>)
              </CardTitle>
              <CardDescription className="text-amber-100">
                한국의 대표적인 고급 식용버섯에 대한 종합 정보
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="송이버섯 상세 이미지"
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Basidiomycota</Badge>
                    <Badge variant="secondary">Tricholomataceae</Badge>
                    <Badge variant="secondary">Tricholoma</Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      분포 및 서식지
                    </h3>
                    <p className="text-gray-700 mb-3">
                      주로 한국, 일본, 중국, 러시아 극동 지역의 소나무림에서 자생함. 해발 200-1,500m의 산지에서
                      발견되며, 특히 소나무(<i>Pinus densiflora</i>)와 공생 관계를 형성함.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>한반도: 강원도, 경북, 충북 산간지역</li>
                      <li>일본: 혼슈, 시코쿠, 규슈</li>
                      <li>중국: 동북부 지역</li>
                      <li>러시아: 연해주, 사할린</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      채취 시기
                    </h3>
                    <p className="text-gray-700">
                      9월 중순부터 10월 중순까지가 주요 채취 시기임. 기온이 15-20°C이고 적당한 습도를 유지할 때
                      발생함.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Microscope className="w-5 h-5 text-purple-600" />
                      형태학적 특징
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>갓: 지름 5-20cm, 처음엔 반구형에서 편평하게 변화</li>
                      <li>색깔: 갈색에서 황갈색, 표면에 섬유상 인편</li>
                      <li>대: 길이 5-15cm, 굵기 1-3cm, 속이 차있음</li>
                      <li>포자: 타원형, 크기 6-7 × 4-5μm</li>
                      <li>향: 독특하고 강한 향기</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Gastrodia elata Section */}
        <section id="gastrodia" className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                천마 (<i>Gastrodia elata</i>)
              </CardTitle>
              <CardDescription className="text-purple-100">전통 한의학의 귀중한 약재에 대한 종합 정보</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="천마 상세 이미지"
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Orchidaceae</Badge>
                    <Badge variant="secondary">Gastrodia</Badge>
                    <Badge variant="secondary">Mycoheterotroph</Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      분포 및 서식지
                    </h3>
                    <p className="text-gray-700 mb-3">
                      동아시아 지역의 온대 및 아열대 산림에 분포함. 주로 활엽수림이나 침엽수림의 부식질이 풍부한
                      토양에서 자생하며, 균류와 공생하는 균영양의존성 식물임.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>한국: 전국 산지 (해발 100-1,500m)</li>
                      <li>중국: 중부 및 남부 지역</li>
                      <li>일본: 혼슈, 시코쿠, 규슈</li>
                      <li>기타: 히말라야, 동남아시아 일부</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      채취 및 가공
                    </h3>
                    <p className="text-gray-700">
                      가을부터 이듬해 봄까지 뿌리줄기를 채취합니다. 채취 후 증기로 쪄서 건조시키는 과정을 거쳐 약재로
                      가공됩니다.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Microscope className="w-5 h-5 text-purple-600" />
                      형태학적 특징
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>뿌리줄기: 타원형, 길이 3-15cm, 지름 1.5-5cm</li>
                      <li>색깔: 황백색에서 담황갈색</li>
                      <li>줄기: 높이 30-100cm, 황갈색</li>
                      <li>잎: 퇴화되어 비늘 모양</li>
                      <li>꽃: 황갈색, 총상화서</li>
                      <li>주요 성분: 가스트로딘, 바닐린 등</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Research Information */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">연구 및 활용 정보</CardTitle>
              <CardDescription>최신 연구 동향과 활용 방안에 대한 정보</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-700">송이버섯 연구 분야</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>인공재배 기술 개발</li>
                    <li>항암 및 면역증강 효과</li>
                    <li>향기 성분 분석</li>
                    <li>생태학적 연구</li>
                    <li>유전자 분석 및 분류</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">천마 연구 분야</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>신경보호 효과 연구</li>
                    <li>인공재배 및 조직배양</li>
                    <li>약리학적 성분 분석</li>
                    <li>임상 효능 연구</li>
                    <li>품질 표준화 연구</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
