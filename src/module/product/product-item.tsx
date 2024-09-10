import FramerWrapper from "@/components/custom/framer-wrapper"
import { Image } from "@/components/custom/image"

type ProductItemProps = {
  item: Product
  delay: number
}

export const ProductItem = ({ item, delay }: ProductItemProps) => {
  return (
    <FramerWrapper y={0} scale={0.8} delay={delay} duration={0.15}>
      <div className='h-full rounded-lg border overflow-hidden dark:bg-black relative border-black dark:border-white transform hover:-translate-y-1 transition-transform duration-100 shadow'>
        <Image src={item.image[0]} alt={item.name} width={500} height={500} />
        <div className='w-[80%] border-t border-gray-300 dark:border-gray-600 mx-auto'></div>
        <div className='flex flex-col justify-between h-[80px] px-2 pb-2'>
          <h2 className="text-lg text-ellipsis overflow-hidden">{item.name}</h2>
          <div className='flex justify-between gap-3 text-sm'>
            <span className="font-bold truncate">{item.type.name}</span>
            <span className="">{item.price}<span className='text-gray-400'>$</span></span>
          </div>
        </div>
      </div>
    </FramerWrapper>
  )
}

