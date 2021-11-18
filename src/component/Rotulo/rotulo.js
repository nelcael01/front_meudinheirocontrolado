import gridCss  from '../../utilities/Grid.js';
import './rotulo_style.css'

const Rotulo = (props)  => {    
    
    function colClasseCss() {
        // Carrega a Grid Css
        let classeCss = gridCss(props.cols ? props.cols : '12')
        // Retorna as classes CSS customizadas    
        return classeCss
    }

    return (
        <div className={colClasseCss()}>
            <div className={props.horizontal? 'content-rotulo rotulo-horizontal' : 'content-rotulo rotulo-vertical'}>
                <div className="label-rotulo p-col-fixed label-destaque">
                    <label >
                        { props.nome }
                        { props.obrigatorio? ( <span className='obrigatorio'>*</span> ) : '' }
                    </label>
                </div>
                <div className="p-col elemento">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Rotulo;