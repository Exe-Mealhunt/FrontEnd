import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  id?: string;
};

const CoverImage = ({ title, src, id }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={`shadow-sm w-full`}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      <Link href={`/blog/${id}`} aria-label={title}>
        {image}
      </Link>
    </div>
  );
};

export default CoverImage;
