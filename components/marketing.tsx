'use client'

import { useRef, useEffect, useState } from "react"
import { useScroll } from "framer-motion";
import Image from "next/image";
import { useTheme } from 'next-themes'
import { InView } from 'react-intersection-observer';
import UserAuthButton from "./user-auth-button";
import Link from "next/link";

export default function Marketing() {
  const ref = useRef(null)
  const [currentSection, setCurrentSection] = useState<number>(0)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });
  const [scrollState, setScrollState] = useState<number>(0)
  const [themeState, setThemeState] = useState<string>('light')

  
  useEffect(() => {
    if (theme) {
      setThemeState(theme)
    }
    document.addEventListener('scroll', () => {setScrollState(scrollYProgress.get())}, {passive: true});
    return () => document.removeEventListener('scroll', () => {setScrollState(scrollYProgress.get())});
  }, [scrollYProgress, theme])

  
  return (
      <>
        <InView threshold={0.75} as="div" onChange={(inView) => (inView) ? setCurrentSection(0) : ''}>
            <section className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
              <div ref={ref} className="flex gap-4 flex-col">
                <h1 className="px-8 text-primary dark:text-primary-dark text-3xl md:text-5xl font-semibold text-center">Приложение для управления процессами на NextJS 13</h1>
                <h2 className="px-8 text-secondary dark:text-secondary-dark text-xl md:text-3xl text-center">Совместная работа с досками, таблицами и карточками</h2>
              </div>
            </section>
        </InView>
        <InView threshold={0.75} as="div" onChange={(inView) => (inView) ? setCurrentSection(1) : ''}>
            <section className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
              <div className="flex gap-4 flex-col">
                <h1 className="px-8 text-primary dark:text-primary-dark text-3xl md:text-5xl font-semibold text-center">Доски и таблицы</h1>
                <h2 className="px-8 text-secondary dark:text-secondary-dark text-xl md:text-3xl text-center">Управление задачами в удобном формате</h2>
              </div>
            </section>
        </InView>
        <InView threshold={0.75} as="div" onChange={(inView) => (inView) ? setCurrentSection(2) : ''}>
            <section className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
              <div className="flex gap-4 flex-col">
                <h1 className="px-8 text-primary dark:text-primary-dark text-3xl md:text-5xl font-semibold text-center">Карточки</h1>
                <h2 className="px-20 text-secondary dark:text-secondary-dark text-xl md:text-3xl text-center">Создавайте документ прямо в карточке. Устанавливайте тип задачи и ответственных за нее.</h2>
              </div>
            </section>
        </InView>
        <InView threshold={0.75} as="div" onChange={(inView) => (inView) ? setCurrentSection(3) : ''}>
            <section className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
              <div className="flex gap-4 flex-col">
                <h1 className="px-8 text-primary dark:text-primary-dark text-3xl md:text-5xl font-semibold text-center">Совместная работа</h1>
                <h2 className="px-8 text-secondary dark:text-secondary-dark text-xl md:text-3xl text-center">Приглашайте других пользователей и работайте вместе</h2>
              </div>
            </section>
        </InView>
        <InView threshold={0.75} as="div" onChange={(inView) => (inView) ? setCurrentSection(4) : ''}>
            <section className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
              <div className="flex gap-4 flex-col justify-center items-center">
                <h1 className="px-8 text-primary dark:text-primary-dark text-3xl md:text-5xl font-semibold text-center">Код приложения доступен на <Link className="underline" href={'https://github.com/Halatnbly/nash-you-track'}>GitHub</Link></h1>
                <div className="flex">
                  <h2 className="pr-2 text-secondary dark:text-secondary-dark text-xl md:text-3xl text-center">Для начала работы нужно</h2>
                  <UserAuthButton />
                </div>
              </div>
            </section>
        </InView>

        <div className="absolute bottom-0 left-0 w-[calc(100vw-11px)] h-[calc(100vh+35px)] overflow-hidden">
            {/* <Image
              style={{scale: '75%', transform: `translate(${(scrollState != undefined && scrollState < 0.49) ? '0' : `-${((scrollState*100)-50)*20}`}px)`}}
              src={`/assets/create.png`}
              width={530}
              height={420}
              alt="Create"
              className="absolute overflow-hidden left-[-6%] hidden xl:block bottom-[1%] md:left-[0%] md:bottom-[-20px]"
            />
            <Image
              style={{scale: '75%', transform: `translate(${(scrollState != undefined && scrollState < 0.49) ? '0' : `${((scrollState*100)-50)*20}`}px, ${(scrollState != undefined && scrollState < 0.49) ? '0' : `-${((scrollState*100)-50)*10}`}px)`}}
              src={`/assets/users.png`}
              width={615}
              height={310}
              alt="Users"
              className="absolute overflow-hidden right-[-9%] hidden xl:block top-[4%] md:top-[0%] xl:right-[10%] scale-[80%]"
            />
            <Image
              style={{scale: '75%', transform: `translateX(${(scrollState != undefined && scrollState < 0.5) ? '0' : `${((scrollState*100)-50)*40}`}px)`}}
              src={`/assets/table.png`}
              width={1715}
              height={585}
              alt="Table"
              className="absolute overflow-hidden hidden xl:block bottom-[-5%] right-[-24%]"
            /> */}
          </div>

          <div className="fixed top-0 left-0 w-[calc(100vw-11px)] overflow-hidden">
            <Image
                style={{transform: currentSection == 1 ? 'translateY(0px) translateX(-50%)' : 'translateY(100%) translateX(-50%)'}}
                src={`/assets/pres-table.png`}
                width={1466}
                height={446}
                alt="Table"
                className="fixed bottom-[0px] left-[50%] md:bottom-[-400px] w-full max-w-[1280px] transition-all duration-500"
              />
              <Image
                style={{transform: currentSection == 2 ? 'translateY(0px) translateX(-50%)' : 'translateY(100%) translateX(-50%)'}}
                src={`/assets/pres-card.png`}
                width={1466}
                height={446}
                alt="Table"
                className="fixed bottom-[0px] left-[50%] md:bottom-[-400px] w-full max-w-[1280px] transition-all duration-500"
              />
              <Image
                style={{transform: currentSection == 3 ? 'translateY(0px) translateX(-50%)' : 'translateY(100%) translateX(-50%)'}}
                src={`/assets/pres-users.png`}
                width={1466}
                height={446}
                alt="Table"
                className="fixed bottom-[0px] left-[50%] md:bottom-[-400px] w-full max-w-[1280px] transition-all duration-500"
              />
              <Image
                style={{transform: currentSection == 4 ? 'translateY(0px) translateX(-50%)' : 'translateY(100%) translateX(-50%)'}}
                src={`/assets/git.png`}
                width={1466}
                height={446}
                alt="Table"
                className="fixed bottom-[0px] left-[50%] md:bottom-[-400px] w-full max-w-[1280px] transition-all duration-500"
              />
          </div>
      </> 
  )
}