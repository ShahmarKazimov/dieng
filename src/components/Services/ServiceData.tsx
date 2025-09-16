// app/services/page.tsx
import { serviceService } from '@/API/Services/services.service';
import Link from "next/link";
import Image from 'next/image';

export default async function ServicesPage() {
    const services = await serviceService.getAllServices('en');

    return (
        <div>
            {services.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No services found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center gap-y-4 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full min-h-[500px] max-h-[500px]"
                        >
                            {service.photo && (
                                <div className='border border-[#009900] w-max rounded-full'>
                                    <div className="relative rounded-full overflow-hidden w-[239px] h-[239px] border-5 border-transparent">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${service.photo}`}
                                            alt={service.title}
                                            fill
                                            sizes="239px"
                                            priority
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col flex-grow">
                                <h2 className="text-2xl text-center mb-2 text-[#FFFFFF] line-clamp-2">
                                    {service.title}
                                </h2>

                                <p className="text-[#FFFFFFB2] text-sm text-center line-clamp-4">
                                    {service.content}
                                </p>
                            </div>
                            <Link
                                className='mx-auto relative -top-[50px] text-[#323232] py-3 rounded-full font-[euclid-Bold] flex items-center space-x-[10px] group bg-white px-6 w-max hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20'
                                href="/contact"
                            >
                                Get Service
                            </Link>

                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}