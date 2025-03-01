import './Pagination.css';
import next from '@/assets/images/arrow-right-s-line.svg';
import toEnd from '@/assets/images/skip-right-line.svg';

function Pagination({ pageNum, totalNum, setPage }: { pageNum: number, totalNum: number, setPage: (pageNum: any) => void }) {

    const pageZero = () => {
        setPage(0)
    }

    const prevPage = () => {
        if (pageNum > 1) {
            setPage((p: number) => p - 1)
        }
    }

    const nextPage = () => {
        if (pageNum < totalNum) {
            setPage((p: number) => p + 1)
        }
    }

    const pageEnd = () => { setPage(totalNum - 1) }


    return (
        <section className='container'>
            <div>
                <img className='rotate' src={toEnd} alt="go to last page" onClick={prevPage} />
                <img className='rotate' src={next} alt="next page" onClick={pageZero} />
                <div>{`${pageNum} / ${totalNum}`}</div>
                <img src={next} alt="next page" onClick={nextPage} />
                <img src={toEnd} alt="go to last page" onClick={pageEnd} />
            </div>
        </section>
    );
}

export { Pagination }