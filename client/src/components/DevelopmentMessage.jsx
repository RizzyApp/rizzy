const testEmail = "test@gmail.com";
const testPasword = "test123";
const otherTestEmail = "signalrtest@gmail.com";
const otherTestPasword = "test123";

const DevelopmentMessage = () => {
    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <div className="font-bold text-gray-700">Test user:</div>
            <div className="mt-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-blue-600 font-mono">{testEmail}</span>
            </div>
            <div className="mt-1">
                <span className="font-medium text-gray-600">Password:</span>
                <span className="ml-2 text-blue-600 font-mono">{testPasword}</span>
            </div>
            <div className="mt-4 font-bold text-gray-700">Other test user: </div>
            <p className="font-light italic text-gray-400">To test signalR you must use this user in an incognito tab :D</p>
            <div className="mt-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-blue-600 font-mono">{otherTestEmail}</span>
            </div>
            <div className="mt-1">
                <span className="font-medium text-gray-600">Password:</span>
                <span className="ml-2 text-blue-600 font-mono">{otherTestPasword}</span>
            </div>
        </div>

    );
};

export default DevelopmentMessage;