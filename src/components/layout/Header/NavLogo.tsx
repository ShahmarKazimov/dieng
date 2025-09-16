import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.svg"
                alt="Logo"
                width={106}
                height={25}
                className="w-[106px] h-auto"
            />
        </Link>
    );
}
