import './Pagination.css';
import next from '@/assets/images/arrow-right-s-line.svg';
import toEnd from '@/assets/images/skip-right-line.svg';

interface IProps {
    useStore: any;
}

// take useStore as a prop
function Pagination({ useStore }: IProps) {

    const { currentPage, totalPage, toZeroPage, toPrevPage, toNextPage, toLastPage } = useStore();

    return (
        <section className='container'>
            <div>
                <img className='rotate' src={toEnd} alt="go to last page" onClick={toZeroPage} />
                <img className='rotate' src={next} alt="next page" onClick={toPrevPage} />
                <div>{`${currentPage + 1} / ${totalPage}`}</div>
                <img src={next} alt="next page" onClick={toNextPage} />
                <img src={toEnd} alt="go to last page" onClick={toLastPage} />
            </div>
        </section>
    );
}

export { Pagination }