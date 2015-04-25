//----------------------------------------------------
// Thank you John D. Cook
// http://www.johndcook.com/blog/skewness_kurtosis/
//----------------------------------------------------
if (typeof RunningStats === 'undefined') RunningStats = function(){
    this.n = 0
    this.M1 = 0
    this.M2 = 0
    this.M3 = 0
    this.M4 = 0
 
    this.Clear = function(){ this.M1 = this.M2 = this.M3 = this.M4 = this.n = 0 }
 
    this.Push = function(x){
        var delta, delta_n, delta_n2, term1, n1 = this.n
        this.n++
        delta = x - this.M1
        delta_n = delta/this.n
        delta_n2 = delta_n*delta_n
        term1 = delta*delta_n*n1
        this.M1 += delta_n
        this.M4 += term1*delta_n2*(this.n*this.n - 3*this.n + 3) + 6*delta_n2*this.M2 - 4*delta_n*this.M3
        this.M3 += term1*delta_n*(this.n - 2) - 3*delta_n*this.M2
        this.M2 += term1
    }
 
    this.NumDataValues = function(){ return this.n }
 
    this.Mean = function(){ return this.M1 }
 
    this.Variance = function(){ return this.M2/(this.n-1.0) }
 
    this.StandardDeviation = function(){ return Math.sqrt( this.Variance() ) }
 
    this.Skewness = function(){ return Math.sqrt(this.n)*this.M3/Math.pow(this.M2, 1.5) }
 
    this.Kurtosis = function(){ return this.n*this.M4/(this.M2*this.M2) - 3.0 }
 
    this.Plus = function(b){

        var a = this
        // , combined = { n: 0, M1: 0, M2: 0, M3: 0, M4: 0 }
        , combined = new RunningStats
        , delta = b.M1 - a.M1
        , delta2 = delta*delta
        , delta3 = delta*delta2
        , delta4 = delta2*delta2

        combined.n = a.n + b.n
        combined.M1 = (a.n*a.M1 + b.n*b.M1)/combined.n
        combined.M2 = a.M2 + b.M2 + delta2*a.n*b.n/combined.n
        combined.M3 = a.M3 + b.M3 + delta3*a.n*b.n*(a.n - b.n)/(combined.n*combined.n)
        combined.M3 += 3.0*delta*(a.n*b.M2 - b.n*a.M2)/combined.n
        combined.M4 = a.M4 + b.M4 + delta4*a.n*b.n*(a.n*a.n - a.n*b.n + b.n*b.n)/(combined.n*combined.n*combined.n)
        combined.M4 += 6.0*delta2*(a.n*a.n*b.M2 + b.n*b.n*a.M2)/(combined.n*combined.n) + 4.0*delta*(a.n*b.M3 - b.n*a.M3)/combined.n

        return combined
    }
 
    this.PlusEquals = function(rhs){ 
        var sum = this.Plus(rhs)
        this.n = sum.n
        this.M1 = sum.M1
        this.M2 = sum.M2
        this.M3 = sum.M3
        this.M4 = sum.M4
        return this
    }
}