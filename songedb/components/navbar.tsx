"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu, Leaf, Home, Info, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import ToolsDialog from "./tools/tools-dialog"

const navigation = [
  { name: "홈", href: "/", icon: Home },
  { name: "소개", href: "/about", icon: Info },
  { name: "도구", href: "#", icon: Database },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          {/* 데스크탑 네비게이션 */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="hidden font-bold sm:inline-block">송이버섯 & 천마 DB</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigation.map((item) => {
                const Icon = item.icon
                if (item.name === "도구") {
                  return (
                      <ToolsDialog key={item.name}>
                        <button
                            className={cn(
                                "flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
                            )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </button>
                      </ToolsDialog>
                  )
                }
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                            pathname === item.href ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                )
              })}
            </nav>
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>

              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="font-bold">송이버섯 & 천마 DB</span>
              </Link>

              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    if (item.name === "도구") {
                      return (
                          <ToolsDialog key={item.name}>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                                )}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </button>
                          </ToolsDialog>
                      )
                    }
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80",
                                pathname === item.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* 오른쪽 공간 */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Link href="/" className="flex items-center space-x-2 md:hidden">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="font-bold">송이버섯 & 천마 DB</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
  )
}
