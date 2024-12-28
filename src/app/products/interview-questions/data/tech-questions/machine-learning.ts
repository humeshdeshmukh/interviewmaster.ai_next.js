import { Question } from '../../types';

export const machineLearningQuestions: Question[] = [
  {
    id: 13001,
    title: 'Machine Learning Model Deployment',
    description: 'Explain the process of deploying ML models in production.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `Machine Learning Model Deployment Process:

1. Model Serving API:
\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load model
model = joblib.load('model.pkl')

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: float
    probability: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    # Convert features to numpy array
    features = np.array(request.features).reshape(1, -1)
    
    # Make prediction
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0].max()
    
    return PredictionResponse(
        prediction=float(prediction),
        probability=float(probability)
    )
\`\`\`

2. Model Monitoring:
\`\`\`python
import pandas as pd
from sklearn.metrics import accuracy_score
from datetime import datetime

class ModelMonitor:
    def __init__(self, model, threshold=0.8):
        self.model = model
        self.threshold = threshold
        self.predictions = []
        self.actuals = []
        
    def log_prediction(self, features, prediction, actual=None):
        timestamp = datetime.now()
        self.predictions.append({
            'timestamp': timestamp,
            'features': features,
            'prediction': prediction,
            'actual': actual
        })
        
        if actual is not None:
            self.actuals.append(actual)
            
    def check_drift(self, window_size=1000):
        if len(self.actuals) < window_size:
            return False
            
        recent_preds = pd.DataFrame(self.predictions[-window_size:])
        accuracy = accuracy_score(
            recent_preds['actual'],
            recent_preds['prediction']
        )
        
        return accuracy < self.threshold
\`\`\`

3. Feature Pipeline:
\`\`\`python
from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd

class FeatureTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.numerical_features = ['age', 'income']
        self.categorical_features = ['occupation', 'education']
        
    def fit(self, X, y=None):
        # Calculate statistics for numerical features
        self.num_stats = {
            feature: {
                'mean': X[feature].mean(),
                'std': X[feature].std()
            }
            for feature in self.numerical_features
        }
        
        # Calculate value counts for categorical features
        self.cat_mappings = {
            feature: X[feature].value_counts().to_dict()
            for feature in self.categorical_features
        }
        
        return self
        
    def transform(self, X):
        X_transformed = X.copy()
        
        # Transform numerical features
        for feature in self.numerical_features:
            X_transformed[feature] = (
                X_transformed[feature] - self.num_stats[feature]['mean']
            ) / self.num_stats[feature]['std']
            
        # Transform categorical features
        for feature in self.categorical_features:
            X_transformed[feature] = X_transformed[feature].map(
                self.cat_mappings[feature]
            )
            
        return X_transformed
\`\`\`

4. Model Versioning:
\`\`\`python
from datetime import datetime
import json

class ModelVersion:
    def __init__(self, model, metadata):
        self.model = model
        self.metadata = metadata
        self.created_at = datetime.now()
        self.version = self._generate_version()
        
    def _generate_version(self):
        return f"{self.created_at.strftime('%Y%m%d%H%M%S')}"
        
    def save(self, path):
        # Save model
        model_path = f"{path}/model_{self.version}.pkl"
        joblib.dump(self.model, model_path)
        
        # Save metadata
        metadata_path = f"{path}/metadata_{self.version}.json"
        with open(metadata_path, 'w') as f:
            json.dump({
                'version': self.version,
                'created_at': self.created_at.isoformat(),
                'metadata': self.metadata
            }, f)
            
    @classmethod
    def load(cls, path, version):
        # Load model
        model = joblib.load(f"{path}/model_{version}.pkl")
        
        # Load metadata
        with open(f"{path}/metadata_{version}.json", 'r') as f:
            data = json.load(f)
            
        return cls(model, data['metadata'])
\`\`\`

Best Practices:
1. Model Deployment
   - Version control for models
   - Automated testing
   - Gradual rollout
   - Monitoring setup
   - Fallback strategy

2. Performance Optimization
   - Model quantization
   - Batch predictions
   - Caching
   - Load balancing
   - Resource scaling

3. Monitoring
   - Prediction accuracy
   - Feature drift
   - System metrics
   - Response times
   - Error rates`
  },
  {
    id: 13002,
    title: 'Feature Engineering and Selection',
    description: 'Explain feature engineering techniques and selection methods.',
    category: 'Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Feature Engineering and Selection Techniques:

1. Feature Engineering Pipeline:
\`\`\`python
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class DateFeatureExtractor(BaseEstimator, TransformerMixin):
    def __init__(self, date_column):
        self.date_column = date_column
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X = X.copy()
        date_series = pd.to_datetime(X[self.date_column])
        
        X['day_of_week'] = date_series.dt.dayofweek
        X['month'] = date_series.dt.month
        X['year'] = date_series.dt.year
        X['is_weekend'] = date_series.dt.dayofweek.isin([5, 6]).astype(int)
        
        return X.drop(columns=[self.date_column])

class TextFeatureExtractor(BaseEstimator, TransformerMixin):
    def __init__(self, text_column):
        self.text_column = text_column
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X = X.copy()
        
        # Text length
        X['text_length'] = X[self.text_column].str.len()
        
        # Word count
        X['word_count'] = X[self.text_column].str.split().str.len()
        
        # Average word length
        X['avg_word_length'] = (
            X[self.text_column].str.split()
            .apply(lambda x: np.mean([len(word) for word in x]))
        )
        
        return X.drop(columns=[self.text_column])

# Feature Pipeline
def create_feature_pipeline(
    numeric_features,
    categorical_features,
    date_features,
    text_features
):
    transformers = []
    
    # Numeric features
    if numeric_features:
        numeric_transformer = Pipeline(steps=[
            ('scaler', StandardScaler())
        ])
        transformers.append(
            ('num', numeric_transformer, numeric_features)
        )
    
    # Categorical features
    if categorical_features:
        categorical_transformer = Pipeline(steps=[
            ('onehot', OneHotEncoder(drop='first', sparse=False))
        ])
        transformers.append(
            ('cat', categorical_transformer, categorical_features)
        )
    
    # Date features
    if date_features:
        for date_col in date_features:
            transformers.append(
                (f'date_{date_col}',
                 DateFeatureExtractor(date_col),
                 [date_col])
            )
    
    # Text features
    if text_features:
        for text_col in text_features:
            transformers.append(
                (f'text_{text_col}',
                 TextFeatureExtractor(text_col),
                 [text_col])
            )
    
    return ColumnTransformer(transformers)
\`\`\`

2. Feature Selection:
\`\`\`python
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.ensemble import RandomForestClassifier
from boruta import BorutaPy

class FeatureSelector:
    def __init__(self, method='statistical', **kwargs):
        self.method = method
        self.kwargs = kwargs
        self.selected_features = None
        
    def fit(self, X, y):
        if self.method == 'statistical':
            selector = SelectKBest(
                score_func=f_classif,
                k=self.kwargs.get('k', 10)
            )
            selector.fit(X, y)
            self.selected_features = X.columns[selector.get_support()]
            
        elif self.method == 'tree_based':
            rf = RandomForestClassifier(n_estimators=100)
            rf.fit(X, y)
            
            importances = pd.DataFrame({
                'feature': X.columns,
                'importance': rf.feature_importances_
            })
            self.selected_features = (
                importances
                .nlargest(self.kwargs.get('k', 10), 'importance')
                ['feature']
                .values
            )
            
        elif self.method == 'boruta':
            rf = RandomForestClassifier(n_estimators=100)
            boruta = BorutaPy(rf, n_estimators='auto')
            boruta.fit(X.values, y)
            
            self.selected_features = X.columns[boruta.support_]
            
        return self
        
    def transform(self, X):
        return X[self.selected_features]
\`\`\`

3. Feature Importance Analysis:
\`\`\`python
import shap
import matplotlib.pyplot as plt

def analyze_feature_importance(model, X, feature_names):
    # SHAP values
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X)
    
    # Plot SHAP summary
    shap.summary_plot(shap_values, X, feature_names=feature_names)
    
    # Feature importance plot
    if hasattr(model, 'feature_importances_'):
        importances = pd.DataFrame({
            'feature': feature_names,
            'importance': model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        plt.figure(figsize=(10, 6))
        plt.bar(importances['feature'], importances['importance'])
        plt.xticks(rotation=45)
        plt.title('Feature Importance')
        plt.tight_layout()
        plt.show()
        
    return importances
\`\`\`

Best Practices:
1. Feature Engineering
   - Domain knowledge
   - Data validation
   - Handle missing values
   - Scale appropriately
   - Document transformations

2. Feature Selection
   - Cross-validation
   - Multiple methods
   - Stability analysis
   - Feature correlation
   - Business context

3. Monitoring
   - Feature drift
   - Data quality
   - Performance impact
   - Resource usage
   - Update frequency`
  }
];
