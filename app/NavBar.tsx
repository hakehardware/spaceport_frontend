'use client'
import { Flex, Container } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import classnames from 'classnames'
import { usePathname } from 'next/navigation'
import { IoMdPlanet } from 'react-icons/io'
import { GiBaseDome } from 'react-icons/gi'
import { SiPlanetscale } from 'react-icons/si'

const NavBar = () => {
    return (
        <nav className=" border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <SiPlanetscale size="2rem" />
                        </Link>
                        <NavLinks />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/', isDisabled: false },
        { label: 'Farms', href: '/farms', isDisabled: false },
        { label: 'Farmers', href: '/farmers', isDisabled: false },
        { label: 'Containers', href: '/containers', isDisabled: false },
        { label: 'Explorer', href: '/explorer', isDisabled: true },
    ]

    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        className={classnames({
                            'nav-link': true,
                            '!text-zinc-900': link.href === currentPath,
                            '!text-zinc-300': link.isDisabled,
                            disabled: link.isDisabled,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavBar
