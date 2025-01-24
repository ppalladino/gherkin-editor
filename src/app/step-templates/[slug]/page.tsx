import { getStepTemplate } from "@/_services";
import StepTemplateEditor from "./_components/StepTemplateEditor";

interface StepTemplatesEditPageProps {
    params: {slug: string};
}

export default async function StepTemplatesEditPage({params} : StepTemplatesEditPageProps) {
    const paramsResolved = await params;
    const stepTemplateId = paramsResolved.slug;
    const stepTemplate = await getStepTemplate(stepTemplateId);
    // const router = useRouter();

    // const [stepTemplates, setStepTemplates] = useState<StepTemplate[]>([]);
    
    // useEffect(() => {
    //     const loadAllStepTemplates = async () => {
    //       try {
    //         const data = await getAllStepTemplates();
    //         setStepTemplates(data);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     loadAllStepTemplates();
    //   }, []);

    return (
        <StepTemplateEditor stepTemplate={stepTemplate}/>
    );
}