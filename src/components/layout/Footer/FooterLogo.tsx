import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 justify-center sm:justify-start">
            <Image
                src="/images/logo.svg"
                alt="Logo"
                width={154}
                height={41}
                className="w-40 h-auto"
            />
        </Link>
    );
}
