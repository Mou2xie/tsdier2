import './WelcomePage.css';

function WelcomePage() {
    return (
        <main>
            <h1>你好，欢迎使用 <span>Transider</span></h1>
            <p>这是一个可以翻译并记录英语单词的工具</p>
            <p>只需鼠标<span>双击</span>网页中的单词，即可在侧边栏中翻译和标记</p>

            <a href="https://www.thoughtco.com/learn-english-1210365" target='_blank'>
                <div className='btn'>去试试</div>
            </a>
        </main>
    )
}

export default WelcomePage;