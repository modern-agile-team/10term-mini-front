import hohem from '../assets/Hohem.jpg'

function WebtoonCards() {
    return (
        <div>
            <div>
                {/* 썹네일 */}
                <a href="#">
                    <img src={hohem} className="w-[160px] h-[207px]"></img>
                </a>
            </div>
            <div className="pt-[10px] font-pretendard font-semibold">
                {/* 웹툰제목 */}
                <a href="#">호랑이형님</a>
            </div>
        </div>
    );
}

export default WebtoonCards;