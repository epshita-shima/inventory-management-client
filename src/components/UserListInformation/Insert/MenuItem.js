import { Accordion, Card, Nav } from 'react-bootstrap';

const MenuItem = ({ item }) => {
//   if (!item.dropdown || item.dropdown.length === 0) {
//     return (
//       <Nav.Item>
//         <Nav.Link href={item?.url}>{item.label}</Nav.Link>
//       </Nav.Item>
//     );
//   } else {
//     return (
//       <Accordion>
//         <Card>
//           <Accordion.Toggle as={Card.Header} eventKey={item?.label}>
//             {item.label}
//           </Accordion.Toggle>
//           <Accordion.Collapse eventKey={item.label}>
//             <Card.Body>
//               <Nav className="flex-column">
//                 {item?.dropdown?.map(child => {
//                     return(<MenuItem key={child?.label} item={child} />)
                  
//   })}
//               </Nav>
//             </Card.Body>
//           </Accordion.Collapse>
//         </Card>
//       </Accordion>
//     );
//   }
return(
    <h2>This is menuitem</h2>
)
};
export default MenuItem