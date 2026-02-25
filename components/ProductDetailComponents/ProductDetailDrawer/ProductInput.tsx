import React, { useEffect, useState } from 'react'
import useSSReview from '../../../hooks/ProductDetailPageHooks/useSSReview';

export default function ProductInput({ setIsAccepted, ssReviewData, setSsReviewData }: any) {
    const [isRejected, setIsRejected] = useState(false);

    const { saveSsReview, loading } = useSSReview();

    const ssReviewOptions = [
        "Cutting problem",
        "QC Reject",
        "Wastage issue",
        "Repetitive design",
        "Mediocre design",
        "Elements of design not good",
        "Not attractive design",
        "Looks like a die piece",
        "Excessive use of meena or CZ",
        "Damage & scratches on design",
        "Cutting & dull finishing is bad",
        "Defect in colour",
        "Twist problem",
        "Extra gap in design",
        "New design concept",
        "Make in weight range",
        "Design is not good",
        "Nothing new",
        "Unisex design. Will not work",
        "Good design"
    ];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSsReviewData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const success = await saveSsReview(ssReviewData);
        if (success) {
            window.location.reload();
        }
    };

    useEffect(() => {
        if (!ssReviewData.ssReviewDate) {
            const today = new Date().toISOString().split('T')[0];

            setSsReviewData((prev: any) => ({
                ...prev,
                ssReviewDate: today,
            }));
        }
    }, []);

    useEffect(() => {
        const { ssReview, ssSelection, ssReviewDate } = ssReviewData;

        if (
            ssReview &&
            ssReviewDate &&
            ssSelection
        ) {
            if (ssSelection === "Rejected") {
                setIsRejected(true);
                setIsAccepted(false);
            } else {
                setIsRejected(false);
                setIsAccepted(true);
            }
        } else {
            setIsAccepted(false);
            setIsRejected(false);
        }
    }, [ssReviewData]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';

        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">SS Review</h4>

            <table className="table table-bordered align-middle">
                <tbody>
                    <tr>
                        <th style={{ width: "30%" }}>SS REVIEW</th>
                        <td>
                            <select
                                className="form-select"
                                name="ssReview"
                                value={ssReviewData.ssReview}
                                onChange={handleChange}
                            >
                                <option value="">Select Review</option>
                                {ssReviewOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>SS Selection</th>
                        <td>
                            <select
                                className="form-select"
                                name="ssSelection"
                                value={ssReviewData.ssSelection}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>SS Review Date</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={formatDate(ssReviewData.ssReviewDate)}
                                disabled
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {isRejected && (
                <button
                    className="btn btn-warning mt-3"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            )}
        </div>
    );
}