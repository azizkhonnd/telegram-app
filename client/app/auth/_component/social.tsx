'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useTranslation } from "react-i18next";

const Social = () => {
	const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation()

	const onSignIn = async (provider: string) => {
		setIsLoading(true)
		await signIn(provider, { callbackUrl: '/' })
	}

	return (
		<div className='grid grid-cols-2 w-full gap-1'>
			<Button className='min-w-[100%]' variant={'outline'} onClick={() => onSignIn('google')} disabled={isLoading}>
				<span>{t("SignUpWith")} {t("Google")}</span>
				<FaGoogle />
			</Button>
			<Button variant={'secondary'} onClick={() => onSignIn('github')} disabled={isLoading}>
				<span>{t("SignUpWith")} {t("Github")}</span>
				<FaGithub />
			</Button>
		</div>
	)
}

export default Social
