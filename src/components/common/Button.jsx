import './Button.css';

function Button({ onClick, children, className = '', disabled = false }) {
    return (
        <button 
            onClick={onClick} 
            className={`btn ${className}`}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                width: 'fit-content',
                marginTop: 'auto',
                opacity: disabled ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.target.style.backgroundColor = '#0056b3';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.target.style.backgroundColor = '#007bff';
                }
            }}
        >
            {children}
        </button>
    );
}

export default Button;
