import Image from 'next/image';

export default function Home() { 
  return ( 
    <div className="flex-mid-container max-w-1080">
      <div className="vertical-inline-flex pad-tb-20">
        <Image src="/diagram.png" width={700} height={700} layout="responsive"  alt="Diagram" />
      </div>
    </div>
  ); 
}