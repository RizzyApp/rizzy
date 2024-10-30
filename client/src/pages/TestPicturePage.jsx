import Header from "../components/Header.jsx";
import ImageUploadMain from "../components/imageUpload/ImageUploadMain.jsx";


function TestPicturePage() {
    return (
        <div>
            <Header/>
            <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
                <ImageUploadMain/>
            </div>
        </div>


    );
}

export default TestPicturePage;