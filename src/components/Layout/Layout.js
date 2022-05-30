import {Header} from "./Header.js";
import {Footer} from "./Footer.js";

export function Layout({children}) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}