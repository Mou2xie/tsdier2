import './NoteBook.css'
import notebook from '@/assets/images/bookmark-line.svg';

function NoteBook() {
    return (
        <div className='notebook'>
            <img src={notebook} alt="notebook" />
            <p>单词本</p>
            <div>27</div>
        </div>
    );
}

export { NoteBook }