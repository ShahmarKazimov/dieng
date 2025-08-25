import { Suspense } from 'react';
import FooterContent from './FooterContent';

const Footer = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <FooterContent />
    </Suspense>
);

export default Footer;
