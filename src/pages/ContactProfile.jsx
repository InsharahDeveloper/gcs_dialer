import { useNavigate, useParams } from "react-router-dom";

const ContactProfile = () => {
  console.log("ContactProfile rendered");
  const navigate = useNavigate();

  const { id } = useParams();

  const handleChat = () => {
    navigate(`/messages/${id}`);
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold">
        👤 Contact {id}
      </h2>

    </div>
  );
};

export default ContactProfile;