import { withBasePath } from '@/utils/basePath';

const imgBrunchWithFriends20250110035526Utc1 = "/assets/a99f405ac70dce27395d3d63bd4f1c6d926f3403.png";
const imgInteriorOfAnExclusiveRestaurant20250324053413Utc1 = "/assets/1bac8a2e947ed0fa58bd07ffe7ddf7d31448023a.png";
const imgCheerfulColleaguesToastingWithWineWhileHavin20241213183654Utc1 = "/assets/8fcfa278d418d8dfb1149f96869b34b09fdd6663.png";

type Tile =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'text'; label: string };

const tiles: Tile[] = [
  { kind: 'image', src: imgBrunchWithFriends20250110035526Utc1, alt: 'Mesa de brunch' },
  { kind: 'text', label: 'Experiências' },
  { kind: 'image', src: imgInteriorOfAnExclusiveRestaurant20250324053413Utc1, alt: 'Interior de restaurante' },
  { kind: 'text', label: 'Gastronomia' },
  { kind: 'image', src: imgCheerfulColleaguesToastingWithWineWhileHavin20241213183654Utc1, alt: 'Brinde entre amigos' },
  { kind: 'text', label: 'Conexões' },
];

export default function Gallery() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-black">
        {tiles.map((tile, index) => {
          const mobileSwapClass =
            index === 2
              ? 'col-start-2 row-start-2 md:col-start-auto md:row-start-auto'
              : index === 3
              ? 'col-start-1 row-start-2 md:col-start-auto md:row-start-auto'
              : '';

          return (
            <div key={index} className={`relative w-full pt-[100%] overflow-hidden ${mobileSwapClass}`}>
              {tile.kind === 'image' ? (
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url('${withBasePath(tile.src)}')` }}
                  role="img"
                  aria-label={(tile as Extract<Tile, { kind: 'image' }>).alt}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-gradient-to-br from-primary-red/45 via-[#140a1f]/70 to-primary-purple/45">
                  <p className="font-['@butler/Light',_serif] text-[28px] md:text-[44px] tracking-[-0.02em] leading-none">
                    {(tile as Extract<Tile, { kind: 'text' }>).label}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
