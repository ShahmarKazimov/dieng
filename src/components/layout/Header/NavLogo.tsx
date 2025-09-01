import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.svg"
                alt="Logo"
                width={119}
                height={40}
                className="w-40 h-auto"
            />
        </Link>
    );
}
